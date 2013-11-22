Description
===========

Crossmon-collect is the gattering service for crossmon-server. 
Crossmon-collect starts periodically the collecting modules 
and send the collected datas to the crossmon-server.

This service only works on conclusion with at least one collecting 
module like crossmon-cpu.


A sample configuration file can be found in the module directory. 
At the startup crossmon-collect searches for a configuration file. This is the search order:

* /etc/crossmon/collect_config.json
* [module-home-directory]/collect_config.json
* [module-home-directory]/collect_config.sample.json


Requirements
============

* [node.js](http://nodejs.org/) -- v0.8.0 or newer
* A running crossmon-server

Installation
============

You can install the collecting service simply by running:

    npm install crossmon-collect -g

You have to set the IP-Address or hostname and the port of the storage service (crossmon-server).

    crossmon-collect setup server value 127.0.0.1
    crossmon-collect setup port value 7654

At minimum you will need one collecting module like crossmon-cpu.

    npm install crossmon-cpu -g

After the module installation you can set up the service. At first you 
must enable the module.

    crossmon-collect enable crossmon-cpu

After that you can setup the module by running. 

    crossmon-collect setup crossmon-cpu

Depending on the installed module the setup will guide you through the configuration.

Running
=======

You can start the service with.

    crossmon-collect start

You can stop the service with.

    crossmon-collect stop

You can restart the service with.

    crossmon-collect restart

Help
====

The following command shows you the options for crossmon-collect. 

    crossmon-collect --help

