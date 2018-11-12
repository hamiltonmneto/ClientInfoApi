﻿using ClientInfoWebApi.Models;
using Microsoft.AspNet.SignalR.Client;
using Microsoft.AspNet.SignalR.Client.Hubs;
using Microsoft.AspNet.SignalR.Client.Transports;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ClientInfoWebApi.Controllers
{
    [RoutePrefix("api/Machines")]
    public class MachinesController : ApiController
    {
        private static List<Machine> machineList = new List<Machine>();

        public HubConnection GetHubConnection(string url)
        {
            var connection = new HubConnection(url);
            return connection;
        }

        [HttpGet]
        public List<Machine> GetMachines()
        {
            return machineList;
        }

        [Route("PostMachines")]
        public void PostMachines(JObject obj)
        {
            JObject jobject = JObject.Parse(obj.ToString());
            var clientMachine = JsonConvert.DeserializeObject<Machine>(jobject.ToString());
            if (!machineList.Any(h => h._MacAddress == clientMachine._MacAddress))
                machineList.Add(clientMachine);
        }


        [Route("PostCommandAsync")]
        public string PostCommandAsync(string macAdress, string ipAdress ,string command)
        {
            try
            {
                var connection = new HubConnection("http://" + ipAdress + ":6969/"+ macAdress + "/signalr");
                IHubProxy hubProxy = connection.CreateHubProxy("CommandHub");
                connection.Start().Wait();
                return hubProxy.Invoke<string>("CommandExec", command).Result;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
