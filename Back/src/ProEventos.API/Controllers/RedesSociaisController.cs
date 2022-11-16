using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Servicos;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using ProEventos.Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using ProEventos.API.Extensions;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RedesSociaisController : ControllerBase
    {
        private readonly IRedeSocialService _redeSocialService;
        private readonly IEventoService _eventoService;
        private readonly IPalestranteService _palestranteService;
        public RedesSociaisController(IRedeSocialService redeSocialService,
                                      IEventoService eventoService,
                                      IPalestranteService palestranteService)
        {
            this._palestranteService = palestranteService;
            this._eventoService = eventoService;
            this._redeSocialService = redeSocialService;
        }

        [HttpGet("evento/{eventoID}")]

        public async Task<IActionResult> GetByEvento(int eventoID)
        {
            try
            {
                if(!(await responsavelEvento(eventoID)))
                    return Unauthorized();

                var redesSociais = await _redeSocialService.GetAllByEventoIdAsync(eventoID);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar recuperar redes sociais do evento. Erro: {ex.Message}");
            }
        }

        [HttpGet("palestrante")]
        public async Task<IActionResult> GetByPalestrante()
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redesSociais = await _redeSocialService.GetAllByPalestranteIdAsync(palestrante.Id);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar recuperar redes sociais do palestrante. Erro: {ex.Message}");
            }
        }

        [HttpPut("evento/{eventoID}")]

        public async Task<IActionResult> SaveByEvento(int eventoID, RedeSocialDto[] models)
        {
            try
            {
                if(!(await responsavelEvento(eventoID)))
                    return Unauthorized();

                var redesSociais = await _redeSocialService.SaveByEvento(eventoID, models);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar salvar rede social do evento. Erro: {ex.Message}");
            }
        }

        [HttpPut("palestrante")]

        public async Task<IActionResult> SaveByPalestrante(RedeSocialDto[] models)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redesSociais = await _redeSocialService.SaveByPalestrante(palestrante.Id, models);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar salvar rede social do palestrante. Erro: {ex.Message}");
            }
        }

        [HttpDelete("evento/{eventoID}/{redeSocialID}")]

        public async Task<IActionResult> DeleteByEvento(int eventoID, int redeSocialID)
        {
            try
            {
                if(!(await responsavelEvento(eventoID)))
                    return Unauthorized();

                var redeSocial = await _redeSocialService.GetRSEventoByIdsAsync(eventoID, redeSocialID);
                if (redeSocial == null) return NoContent();

                if (await _redeSocialService.DeleteByEvento(eventoID, redeSocialID))
                    return Ok(new { message = "Rede Social Deletada" }); //boa prática retornar um objeto
                else
                    throw new Exception("Erro ao tentar deletar rede social do evento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar deletar rede social do evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("palestrante/{redeSocialID}")]

        public async Task<IActionResult> DeleteByPalestrante(int redeSocialID)
        {
            try
            {
                var palestrante = await _palestranteService.GetPalestranteByUserIdAsync(User.GetUserId());
                if(palestrante == null) return Unauthorized();

                var redeSocial = await _redeSocialService.GetRSPalestranteByIdsAsync(palestrante.Id, redeSocialID);
                if (redeSocial == null) return NoContent();

                if (await _redeSocialService.DeleteByPalestrante(palestrante.Id, redeSocialID))
                    return Ok(new { message = "Rede Social Deletada" }); //boa prática retornar um objeto
                else
                    throw new Exception("Erro ao tentar deletar rede social do palestrante.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar deletar rede social do palestrante. Erro: {ex.Message}");
            }
        }

        [NonAction]
        private async Task<bool> responsavelEvento(int evId)
        {
            var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), evId, false);

            if(evento == null) return false;

            return true;
        }
    }
}
