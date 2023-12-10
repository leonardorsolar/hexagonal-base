//https://pt.linkedin.com/pulse/hexagonal-clean-architecture-wellington-guimar%C3%A3es-pimenta-le8rf

//1- crie uma interface IClassA com o metodo x
//2- crie a implementação desta interface com o metodo x ( classAdapterA implement IClassA)
//2- crie a implementação desta interface com o metodo x ( classAdapterB implement IClassA)
//3- crie uma classe que usará a implementação com o metodo x ( class UseCase)
//3.1 no contrutor da classe adicione a interface (constructor(private instance: IClassA))
//3.2 use o método x da classAdapterA ou da classAdapterB

//Casos de uso (camada de aplicação)
//Esta camada contém as regras de negócios específicas do aplicativo. Implementa todos os casos de uso da aplicação, utiliza as classes de domínio, mas está isolado dos detalhes e implementação de camadas externas, como bancos de dados, adaptadores, etc.
//Esta camada contém apenas interfaces para interagir com o mundo exterior.
//Como vimos antes, os casos de uso são as ações ou intenções do usuário, como buscar um pedido, criar um produto e assim por diante. E cada caso de uso deve ser independente dos outros casos de uso, para estar em conformidade com o Princípio de Responsabilidade Única (o primeiro princípio SOLID).
//usecase
import { GetPostByIdUseCase } from "@application/interfaces/use-cases/posts/GetPostByIdUseCase";
import { GetPostByIdRepository } from "@application/interfaces/repositories/posts/GetPostByIdRepository";
import { PostNotFoundError } from "@application/errors/PostNotFoundError";

export class GetPostById implements GetPostByIdUseCase {
  constructor(private readonly getPostByIdRepository: GetPostByIdRepository) {}

  async execute(postId: GetPostByIdUseCase.Input): Promise<GetPostByIdUseCase.Output> {
    const post = await this.getPostByIdRepository.getPostById(postId);
    if (!post) {
      return new PostNotFoundError();
    }
    return post;
  }
}

//Neste exemplo, temos uma interface (GetPostByIdUseCase) que contém Input e Output do caso de uso, que são os DTOs (Data Transfer Objects), que são usados ​​em conjunto com outras interfaces (como o GetPostByIdRepositório interface) para interagir com o mundo exterior.
//Observe que este caso de uso é responsável apenas por buscar uma postagem pelo seu ID, caso precise deletar uma postagem, precisamos criar outro caso de uso. É muito comum trabalhar com o padrão MVC, por exemplo, ter uma classe de controlador gigantesca que trata de todas as solicitações do usuário. No entanto, fere o Princípio da Responsabilidade Única.

//Adaptadores de interface (camada de infraestrutura)
//A camada Infraestrutura é a camada que contém todas as implementações concretas da aplicação, como os repositórios, os adaptadores, as conexões de banco de dados, etc.

//Estruturas e drivers
//Esta camada é composta por frameworks e ferramentas como o Banco de Dados, o Web Framework, etc. Normalmente, não escrevemos muito código nesta camada.

//A Regra de Dependência afirma que:

//"As dependências do código-fonte só podem apontar para dentro."

//"Nada em um círculo interno pode saber alguma coisa sobre algo em um círculo externo."

//Basicamente, o nome de algo declarado em um círculo externo NÃO deve ser mencionado pelo código em um círculo interno. Isso inclui funções, classes. variáveis ​​ou qualquer outra entidade de software nomeada.

//Não queremos que nada no círculo externo tenha impacto nos círculos internos.

//Por exemplo, na camada de domínio NÃO devemos mencionar nada dentro da camada de aplicação, ou dentro da camada de infraestrutura. O mesmo vale para a camada de aplicação, NÃO devemos mencionar nada dentro da camada de infraestrutura e assim por diante.

//Mas obviamente, podemos usar as entidades definidas na camada de domínio na camada de aplicação, por exemplo.
