using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using proyectoComponentes.Models;

namespace proyectoComponentes.Interface
{
    public interface IProductoRepository
    {
        IEnumerable<Productos> ObtenerTodos();
        Productos ObtenerPorId(int id);
    }
}