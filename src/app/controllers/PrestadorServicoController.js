import User from "../models/User";
import File from "../models/File";

class PrestadorServicoController {
  async index(req, res) {
  
    const prestadoservico = await User.findAll(
    {
      where: { prestador_servico: true },
      attributes: ["id", "name", "avatar_id"], //listar os atributos que retorna na pesquisa
      include: [
        //incluir o relacionamento
        {
          model: File,
          as: "relacionamentoAvatar",
          atributes: ["name", "path", "url"],
        },
      ],
    });
    return res.json(prestadoservico);
  }
}

export default new PrestadorServicoController();