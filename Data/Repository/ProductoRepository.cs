using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using proyectoComponentes.Interface;
using proyectoComponentes.Models;

// namespace proyectoComponentes.Data.Repositories
// {
public class ProductoRepository : IProductoRepository
{

    private DatabaseConnector _databaseConnector;

    public ProductoRepository(DatabaseConnector databaseConnector)
    {
        _databaseConnector = databaseConnector;
    }

    public Productos ObtenerPorId(int id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Productos> ObtenerTodos()
    {

        return _databaseConnector.ExecuteStoredProcedure<Productos>("dbo.usp_CatProductos_SelectAll");

    }
}


// }