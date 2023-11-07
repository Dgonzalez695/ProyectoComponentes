using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using proyectoComponentes.Models;

namespace proyectoComponentes.Interface
{
    public interface IfacturaRepository
    {
         void EnviarFactura(Factura factura);
         IEnumerable<Factura> obtenerFacturas();
    }
}