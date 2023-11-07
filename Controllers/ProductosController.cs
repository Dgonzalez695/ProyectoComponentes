using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Dapper;
using proyectoComponentes.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace proyectoComponentes.Controllers
{
    public class ProductosController : Controller
    {
        private readonly ILogger<ProductosController> _logger;

        public ProductosController(ILogger<ProductosController> logger)
        {
            _logger = logger;
        }
        public IActionResult CreacionFactura(){
            return View();
        }

        public IActionResult Index()
        {
        //     Productos productos = new Productos();
        //    List<Productos> Listaproductos =  productos.ConsultarProductos();
        //    ViewBag.Items = new SelectList(Listaproductos, "id", "NombreProducto");
            return View();
        }




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}