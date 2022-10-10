using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Servicos;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILoteService _loteService;
        public LotesController(ILoteService loteService)
        {
            this._loteService = loteService;
        }

        [HttpGet("{eventoID}")]

        public async Task<IActionResult> Get(int eventoID)
        {
            try
            {
                var lotes = await _loteService.GetLotesByEventoIdAsync(eventoID);
                if(lotes == null) return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
            }
        }

        [HttpPut("{eventoID}")]

        public async Task<IActionResult> SaveLotes(int eventoID, LoteDto[] models)
        {
            //Poderia ter chamado de "Put" ao invés de SaveLotes.
            try
            {
                var lotes = await _loteService.SaveLotes(eventoID, models);
                if(lotes == null) return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar salvar lotes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoID}/{loteID}")]

        public async Task<IActionResult> Delete(int eventoID, int loteID)
        {
            try
            {
                var lote = await _loteService.GetLoteByIdsAsync(eventoID, loteID);
                if(lote == null) return NoContent();

                if(await _loteService.DeleteLote(lote.EventoId, lote.Id))
                    return Ok(new {message = "Lote Deletado"}); //boa prática retornar um objeto
                else
                    throw new Exception("Erro ao tentar deletar lote.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                                    $"Erro ao tentar deletar lote. Erro: {ex.Message}");
            }
        }
    }
}
