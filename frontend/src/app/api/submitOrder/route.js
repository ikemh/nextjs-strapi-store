// frontend/src/app/api/submitOrder/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1) Lê o payload enviado pelo front
    const { customer, email, phone, address, cartItems } = await request.json();
    console.log("←← Payload recebido em submitOrder:", {
      customer,
      email,
      phone,
      address,
      cartItems,
    });

    // 2) Cria o Pedido no Strapi
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
          },
        }),
      }
    );

    // Se falhar na criação do pedido, propaga o erro
    if (!orderRes.ok) {
      const err = await orderRes.json();
      console.error("Erro ao criar pedido:", err);
      return NextResponse.json(
        { error: err.error || err.message || "Falha ao criar pedido" },
        { status: orderRes.status }
      );
    }

    const { data: orderData } = await orderRes.json(); // contém orderData.id

    // 3) Cria cada Item do Pedido
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
            produto: item.id,
            pedido: orderData.id,
          },
        }),
      });

    // Dispara todas as criações em paralelo
    const itemResponses = await Promise.all(cartItems.map(createItem));

    // Se algum item falhar, retorna erro
    const failedItem = itemResponses.find((r) => !r.ok);
    if (failedItem) {
      const err = await failedItem.json();
      console.error("Erro ao criar item do pedido:", err);
      return NextResponse.json(
        { error: err.error || err.message || "Falha ao criar item" },
        { status: failedItem.status }
      );
    }

    // 4) Sucesso em todas as etapas
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

// Opcional: impede GET direto nessa rota
export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
}
