using ClientInfoWebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClientInfoWebApi.Controllers
{
    public class MachinesController : ApiController
    {

        private static List<Machine> machineList = new List<Machine>();

        [HttpGet]
        public List<Machine> GetMachines()
        {
            return machineList;
        }

        [HttpPost]
        public void PostMachines(JObject obj)
        {
            JObject jobject = JObject.Parse(obj.ToString());
            var clientMachine = JsonConvert.DeserializeObject<Machine>(jobject.ToString());
            if (!machineList.Any(h => h._HardDrivers == clientMachine._HardDrivers))
                machineList.Add(clientMachine);
        }

    }
}
