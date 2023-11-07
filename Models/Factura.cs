using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoComponentes.Models
{
    public class Factura
    {
        public string FechaEmisionFactura { get; set; }
        public int idCliente { get; set; }
        public int NumeroFactura { get; set; }
        public int NumeroTotalArticulos { get; set; }
        public string SubtotalFactura { get; set; }
        public string TotalImpuestos { get; set; }
        public string TotalFactura { get; set; }
    }
}