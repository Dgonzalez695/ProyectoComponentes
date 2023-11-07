using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using proyectoComponentes.Interface;
using proyectoComponentes.Models;

namespace proyectoComponentes.Data.Repository
{
    public class ClienteRepository : IClientesRepository
    {
        private DatabaseConnector _databaseConnector;
   
        public ClienteRepository(DatabaseConnector databaseConnector)
        {
            _databaseConnector = databaseConnector;
        }

        public IEnumerable<Clientes> Obtenerclientes()
        {
            return _databaseConnector.ExecuteStoredProcedure<Clientes>("dbo.usp_TblClientes_SelectAll");


        }
    }
}