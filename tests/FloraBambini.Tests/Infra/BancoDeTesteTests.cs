using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace FloraBambini.Tests.Infra;

public class BancoDeTesteTests
{
    [Fact]
    public async Task Banco_de_teste_e_criado_pelas_migrations_e_descartado()
    {
        var banco = new BancoDeTeste();

        await banco.InitializeAsync();
        try
        {
            await using var contexto = banco.CriarContexto();

            // A tabela de histórico só existe quando o banco nasce pelas migrations.
            var tabelasDeHistorico = await contexto.Database
                .SqlQuery<int>($"SELECT COUNT(*) AS Value FROM sys.tables WHERE name = '__EFMigrationsHistory'")
                .SingleAsync();
            Assert.Equal(1, tabelasDeHistorico);

            // Ainda não há entidade no contexto: a gravação e a leitura usam uma tabela do próprio teste.
            await contexto.Database.ExecuteSqlAsync($"CREATE TABLE Sonda (Valor int NOT NULL)");
            await contexto.Database.ExecuteSqlAsync($"INSERT INTO Sonda (Valor) VALUES ({42})");
            var lido = await contexto.Database.SqlQuery<int>($"SELECT Valor AS Value FROM Sonda").SingleAsync();
            Assert.Equal(42, lido);
        }
        finally
        {
            await banco.DisposeAsync();
        }

        Assert.False(await BancoExiste(banco.Nome));
    }

    [Fact]
    public void Cada_banco_de_teste_tem_nome_proprio()
    {
        Assert.NotEqual(new BancoDeTeste().Nome, new BancoDeTeste().Nome);
    }

    private static async Task<bool> BancoExiste(string nome)
    {
        await using var conexao = new SqlConnection(BancoDeTeste.ConnectionStringDoServidor);
        await conexao.OpenAsync();

        await using var comando = conexao.CreateCommand();
        comando.CommandText = "SELECT COUNT(*) FROM sys.databases WHERE name = @nome";
        comando.Parameters.AddWithValue("@nome", nome);

        return (int)(await comando.ExecuteScalarAsync())! > 0;
    }
}
