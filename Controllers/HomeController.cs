using System.Collections.Generic;
using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using proyectoComponentes.Interface;
using proyectoComponentes.Models;

namespace proyectoComponentes.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IProductoRepository _productoRepository;
    private readonly IClientesRepository _clientesRepository;
    private readonly IfacturaRepository _facturaRepository;


    public HomeController(ILogger<HomeController> logger, IProductoRepository productoRepository, IClientesRepository clientesRepository, IfacturaRepository facturaRepository)
    {
        _logger = logger;
        _productoRepository = productoRepository;
        _clientesRepository = clientesRepository;
        _facturaRepository = facturaRepository;
    }

    public IActionResult Index()
    {

        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult CreacionFactura()
    {
        return View();
    }

    
    public IActionResult VisorFacturas()
    {
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> ConsultaDatos()
    {

        IEnumerable<Productos> result = _productoRepository.ObtenerTodos();
        return StatusCode(StatusCodes.Status200OK, result);
    }

    [HttpGet]
    public async Task<IActionResult> ConsultaClientes()
    {
        IEnumerable<Clientes> clientes = _clientesRepository.Obtenerclientes();
        return StatusCode(StatusCodes.Status200OK, clientes);
    }


    [HttpPost]
    public async Task<IActionResult> GuardarFactura([FromBody] Factura ModeloFactura)
    {        // IEnumerable<Clientes> clientes = _clientesRepository.Obtenerclientes();
             // Factura factura = JsonSerializer.Deserialize<Factura>(ModeloFactura.ToString());
        _facturaRepository.EnviarFactura(ModeloFactura);

        return StatusCode(StatusCodes.Status200OK);
    }



     [HttpGet]
    public async Task<IActionResult> ConsultaFacturas()
    {
        IEnumerable<Factura> facturas = _facturaRepository.obtenerFacturas();
        return StatusCode(StatusCodes.Status200OK, facturas);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

}


