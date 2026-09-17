# Flora Bambini — e-commerce

Loja online para uma marca local de produtos naturais para mães e bebês, substituindo a venda manual por WhatsApp (catálogo em Excel, soma no papel, link de pagamento avulso) por uma loja própria: catálogo com foto, carrinho, checkout com pagamento online e painel administrativo para a vendedora manter preço, estoque e conteúdo sem depender de desenvolvedor.

O atendimento é de uma única cidade, com entrega própria em raio curto, menos de 100 produtos e até ~50 pedidos por mês. **Escalabilidade não é um problema deste projeto** — a arquitetura é otimizada para simplicidade operacional e para ser mantida por uma pessoa só.

## Por que este repositório é público

Este é o **projeto-exemplo da Turma 1 da [Mentoria Dev .NET IA 10x](https://aspnetpro.com.br/mentoria-dev-net-ia-10x)**, usado para demonstrar na prática o [**Leanwork SDD**](https://github.com/leanwork/leanwork-sdd) — um pipeline de _spec-driven development_ que organiza arquitetura, requisitos, especificação de interface, planejamento, execução e review em skills coordenadas para Claude Code.

A ideia é que o repositório sirva de referência real: um sistema de verdade, com restrições de verdade (teto de R$ 100/mês de infra, um desenvolvedor não dedicado, gateway já contratado), conduzido do documento de arquitetura até o código pelo pipeline — com os artefatos versionados junto.

## Pipeline SDD — onde estamos

| Fase | Artefato | Status |
|---|---|---|
| 1. Architect | [`docs/architecture/proposta-arquitetural.md`](docs/architecture/proposta-arquitetural.md) | Concluída — ADR-001 a ADR-008 |
| 2. PRD | `docs/prds/` | Pendente |
| 3. Prototype | `docs/prototype/` | Pendente |
| 4. Planner | `docs/plans/` | Pendente |
| 5. Execução | código | Não iniciada |
| 6. Review | `docs/reviews/` | Pendente |

Para descobrir o próximo passo a qualquer momento, rode `/leanwork-next` dentro do Claude Code.

## Arquitetura em uma página

Monolito **ASP.NET Core MVC (.NET 10)** publicado como uma unidade, com a loja na raiz e o painel administrativo em uma `Area` do mesmo projeto. Três recursos de nuvem, nada além disso: **Azure App Service**, **Azure SQL Database** (tier Basic) e **Azure Blob Storage** para as imagens. Sem fila, sem cache distribuído, sem serviço auxiliar — trabalho assíncrono roda como serviço hospedado no próprio processo.

As quatro decisões de maior consequência:

1. **O sistema nunca vê dados de cartão, e nunca acredita no que lhe contam sobre o pagamento.** O checkout é hospedado pelo InfinitePay (escopo PCI SAQ-A). Como o webhook do InfinitePay não é assinado, ele é tratado apenas como gatilho: só a resposta de uma **consulta ativa ao gateway** muda o estado de um pedido.
2. **Login de cliente sem senha**, por código de uso único enviado por e-mail (ASP.NET Core Identity). Não há senha de cliente armazenada — em troca, a entregabilidade do e-mail vira requisito crítico.
3. **Frete por faixa de CEP atrás de uma abstração de estratégia.** O MVP não depende de nenhuma API de geolocalização; trocar para cálculo por raio é uma implementação nova da mesma interface.
4. **Carrinho e pedido são agregados separados.** O carrinho é anônimo e persistido; o pedido só nasce na conclusão do checkout. Navegar não retém estoque.

Os diagramas C4 (Contexto e Container), os fluxos críticos, os trade-offs assumidos, as dívidas conscientes e a matriz de riscos estão na [proposta arquitetural](docs/architecture/proposta-arquitetural.md).

## Estrutura

```
docs/
  architecture/   proposta arquitetural e ADRs
  prds/           requisitos (RN) e cenários Gherkin (CA)
  prototype/      especificação de telas (SPEC-UI)
  plans/          quebra em tarefas (T-XX)
  reviews/        relatórios de review (R-XX)
```

## Reproduzindo o pipeline

```bash
git clone https://github.com/leanwork/leanwork-sdd.git
claude plugin marketplace add ./leanwork-sdd
claude plugin install leanwork-sdd@leanwork
```

Comandos disponíveis: `/leanwork-start`, `/leanwork-next`, `/leanwork-prototype`, `/leanwork-execute`, `/leanwork-review`, `/leanwork-trace`, `/leanwork-context`.

## Licença

Projeto pessoal, publicado como material de estudo da mentoria.
