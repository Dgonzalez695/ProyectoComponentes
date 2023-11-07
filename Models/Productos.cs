using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoComponentes.Models
{
    public class Productos
    {
        public int Id { get; set; }
        public string NombreProducto { get; set; }
        public string ImagenProducto { get; set; }
        public decimal PrecioUnitario { get; set; }
        public string ext { get; set; }
    }
}