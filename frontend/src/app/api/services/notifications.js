// frontend/src/app/api/services/notifications.js

/**
 * Função para enviar email de confirmação de pedido para o administrador
 */
export async function sendOrderEmailToAdmin(orderId, orderData, strapiToken) {
  try {
    // Enviar solicitação para o endpoint do Strapi que lidará com o envio de email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/email/send-order-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
        body: JSON.stringify({
          orderId,
          orderData,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Falha ao enviar notificação de email");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    // Não lançamos o erro para não interromper o fluxo principal
    return { success: false, error: error.message };
  }
}

/**
 * Função para preparar o link do WhatsApp para o administrador
 */
export function generateWhatsAppLink(orderId, customer, cartItems, total) {
  try {
    // Número do administrador (com código do país e DDD)
    const adminWhatsApp = process.env.ADMIN_WHATSAPP || "5511999999999";

    // Formatar a mensagem para WhatsApp
    const itemsList = cartItems
      .map(
        (item) =>
          `🔪 *${item.title}* × ${item.quantity}: R$ ${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    // Criando mensagem completa com formatação para WhatsApp
    const message =
      `🔪 *NOVO PEDIDO #${orderId}*\n\n` +
      `*Cliente:* ${customer}\n` +
      `*Data:* ${new Date().toLocaleDateString("pt-BR")}\n\n` +
      `*ITENS DO PEDIDO:*\n${itemsList}\n\n` +
      `*TOTAL:* R$ ${total.toFixed(2)}\n\n` +
      `Acesse o painel admin para mais detalhes.`;

    // URL codificada para abrir diretamente o WhatsApp
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${adminWhatsApp}&text=${encodedMessage}`;
  } catch (error) {
    console.error("Erro ao gerar link do WhatsApp:", error);
    return null;
  }
}
