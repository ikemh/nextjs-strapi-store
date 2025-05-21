/**
 * A set of functions called "actions" for `email`
 */

export default {
  async sendOrderNotification(ctx) {
    try {
      const { orderId, orderData } = ctx.request.body;

      if (!orderId || !orderData) {
        return ctx.badRequest("Dados do pedido incompletos");
      }

      // Cria o conteúdo HTML do email
      const itemsHtml = orderData.cartItems
        .map(
          (item) =>
            `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">🔪 ${item.title}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">R$ ${item.price.toFixed(2)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">R$ ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
        )
        .join("");

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">🔪 Novo Pedido #${orderId}</h1>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #555;">Informações do Cliente</h2>
            <p><strong>Nome:</strong> ${orderData.customer}</p>
            <p><strong>Email:</strong> ${orderData.email}</p>
            <p><strong>Telefone:</strong> ${orderData.phone}</p>
            <p><strong>Endereço:</strong> ${orderData.address.street}, ${orderData.address.number} ${orderData.address.complement ? "- " + orderData.address.complement : ""}<br>
            ${orderData.address.neighborhood}, ${orderData.address.city} - ${orderData.address.state}</p>
          </div>
          
          <h2 style="color: #555;">Itens do Pedido</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Produto</th>
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Qtd.</th>
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Preço</th>
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
                <td style="padding: 10px; font-weight: bold;">R$ ${orderData.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #0066cc;">Este pedido foi gerado automaticamente em ${new Date().toLocaleString("pt-BR")}.</p>
          </div>
        </div>
      `;

      // Envia o email usando o plugin de email do Strapi
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

      await strapi.plugins["email"].services.email.send({
        to: adminEmail,
        subject: `Novo Pedido #${orderId} - ${orderData.customer}`,
        html: emailHtml,
      });

      return ctx.send({ success: true, message: "Email enviado com sucesso" });
    } catch (error) {
      strapi.log.error("Erro ao enviar email de notificação:", error);
      return ctx.badRequest("Falha ao enviar email", { error: error.message });
    }
  },
};
