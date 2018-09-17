using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientInfoWebApi.Models
{
    public class Machine
    {
        public string _IP { get; set; }
        public string _Name { get; set; }
        public string _LogguedUser { get; set; }
        public string _OsVersion { get; set; }
        public List<HardDrive> _HardDrivers { get; set; }


        public Machine(string Ip, string Name, string LoggedUser, string osversion, List<HardDrive> hardDrives)
        {
            _IP = Ip;
            _Name = Name;
            _LogguedUser = LoggedUser;
            _OsVersion = osversion;
            _HardDrivers = hardDrives;
        }

    }
}