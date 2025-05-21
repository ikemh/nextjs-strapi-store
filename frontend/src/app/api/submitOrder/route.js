// frontend/src/app/api/submitOrder/route.js
import { NextResponse } from "next/server";
import {
  sendOrderEmailToAdmin,
  generateWhatsAppLink,
} from "../services/notifications";

export async function POST(request) {
  try {
    // 1) Lê o payload do front
    const { customer, email, phone, address, cartItems } = await request.json();

    // 2) Gera o resumo no formato Blocks em vez de Markdown
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const headerBlock = {
      type: "heading",
      level: 3,
      children: [{ type: "text", text: "Resumo do Pedido", bold: true }],
    };

    // Bloco de informação do cliente
    const customerBlock = {
      type: "paragraph",
      children: [
        { type: "text", text: "👤 ", italic: true },
        { type: "text", text: "Cliente: ", bold: true },
        { type: "text", text: customer },
      ],
    };

    // Cabeçalho da seção de itens
    const itemsHeaderBlock = {
      type: "heading",
      level: 4,
      children: [{ type: "text", text: "Itens do Pedido" }],
    };

    // Blocos para cada item com emoji de faca
    const itemBlocks = cartItems.map((item) => {
      return {
        type: "paragraph",
        children: [
          { type: "text", text: "➡️ " },
          { type: "text", text: item.title, bold: true },
          { type: "text", text: ` × ${item.quantity}`, italic: true },
          { type: "text", text: "\n    " }, // Indentação
          {
            type: "text",
            text: `R$ ${(item.price * item.quantity).toFixed(2)}`,
          },
        ],
      };
    });

    // Bloco para o total estilizado
    const totalBlock = {
      type: "heading",
      level: 5,
      children: [
        { type: "text", text: "Total: ", bold: true },
        { type: "text", text: `R$ ${total.toFixed(2)}` },
      ],
    };

    // Data do pedido
    const dateBlock = {
      type: "paragraph",
      children: [
        { type: "text", text: "📅 " },
        { type: "text", text: "Data: ", bold: true },
        {
          type: "text",
          text: new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    // Estrutura completa do resumo no formato de blocos
    const resumo = [
      headerBlock,
      customerBlock,
      dateBlock,
      itemsHeaderBlock,
      ...itemBlocks,
      totalBlock,
    ];

    console.log("Resumo gerado:", JSON.stringify(resumo, null, 2));

    // 3) Cria o Pedido, incluindo o campo resumo
    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pedidos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            cliente: customer,
            email: email,
            telefone: phone,
            endereco: {
              rua: address.street,
              bairro: address.neighborhood,
              cidade: address.city,
              estado: address.state,
              numero: address.number,
              complemento: address.complement,
            },
            resumo,
          },
        }),
      }
    );

    if (!orderRes.ok) {
      const err = await orderRes.json();
      console.error("Erro ao criar pedido:", err);
      return NextResponse.json(
        { error: err.error || err.message || "Falha ao criar pedido" },
        { status: orderRes.status }
      );
    }
    const { data: orderData } = await orderRes.json();

    // 4) Cria cada Item do Pedido ligado ao pedido
    const createItem = (item) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item-do-pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            quantidade: item.quantity,
            preco: item.price,
            produto: parseInt(item.id) + 1,
            pedido: orderData.id,
          },
        }),
      });

    const results = await Promise.all(cartItems.map(createItem));
    const failed = results.find((r) => !r.ok);
    if (failed) {
      const err = await failed.json();
      console.error("Erro ao criar item do pedido:", err);
      return NextResponse.json(
        { error: err.error || err.message || "Falha ao criar item" },
        { status: failed.status }
      );
    }

    try {
      // Preparar dados completos do pedido
      const orderCompleteData = {
        id: orderData.id,
        customer,
        email,
        phone,
        address,
        cartItems,
        total,
      };

      // Enviar email via API do Strapi
      await sendOrderEmailToAdmin(
        orderData.id,
        orderCompleteData,
        process.env.STRAPI_API_TOKEN
      );

      // Gerar link para WhatsApp
      const whatsappLink = generateWhatsAppLink(
        orderData.id,
        customer,
        cartItems,
        total
      );

      console.log("Notificações enviadas com sucesso");
    } catch (notifError) {
      // Não interrompe o fluxo se as notificações falharem
      console.error("Erro ao enviar notificações:", notifError);
    }

    // 6) Retorna sucesso
    return NextResponse.json(
      {
        message: "Pedido e itens criados com sucesso",
        order: orderData,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("submitOrder error:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao processar o pedido." },
      { status: 500 }
    );
  }
}

// Bloqueia GET nessa rota
export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
}
