using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using proyectoComponentes.Interface;
using proyectoComponentes.Models;

namespace proyectoComponentes.Data.Repository
{
    public class FacturaRepository : IfacturaRepository
    {

        // private readonly Conexion _conexion;
        private DatabaseConnector _databaseConnector;



        public FacturaRepository(DatabaseConnector databaseConnector)
        {
            _databaseConnector = databaseConnector;
        }

        public void EnviarFactura(Factura factura)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@FechaEmisionFactura", factura.FechaEmisionFactura, DbType.String);
            parameters.Add("@idCliente", factura.idCliente, DbType.Int64);
            parameters.Add("@NumeroFactura", factura.NumeroFactura, DbType.Int64);
            parameters.Add("@NumeroTotalArticulos", factura.NumeroTotalArticulos, DbType.Int64);
            parameters.Add("@SubTotalFactura", decimal.Parse(factura.SubtotalFactura), DbType.Decimal);
            parameters.Add("@TotalImpuesto", decimal.Parse(factura.TotalImpuestos), DbType.Decimal);
            parameters.Add("@TotalFactura", decimal.Parse(factura.TotalFactura), DbType.Decimal);
            _databaseConnector.ExecuteStoredProcedureN("dbo.usp_TblFacturas_Insert", parameters);
        }

        public IEnumerable<Factura> obtenerFacturas()
        {
           return _databaseConnector.ExecuteStoredProcedure<Factura>("dbo.ConsultarFacturas");

        }




    }
}