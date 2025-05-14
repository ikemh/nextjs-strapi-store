import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  console.log("teste//////", req, res);
  if (req.method === "POST") {
    const { customer, email, phone, address, cartItems, total } = req.body;

    // Prepara os dados a serem gravados no arquivo JSON
    const orderData = {
      customer,
      email,
      phone,
      address,
      cartItems,
      total,
      timestamp: new Date().toISOString(), // Timestamp do pedido
    };

    // Caminho do arquivo JSON (pode ser alterado conforme necessidade)
    const filePath = path.join(process.cwd(), "data", "orders.json");

    try {
      // Verificar se o arquivo já existe e carregar os dados anteriores
      let orders = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        orders = JSON.parse(fileData);
      }

      // Adicionar o novo pedido aos dados existentes
      orders.push(orderData);

      // Salvar os dados no arquivo
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

      // Retornar resposta de sucesso
      res.status(200).json({ message: "Pedido registrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      res.status(500).json({ message: "Erro ao salvar pedido." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
