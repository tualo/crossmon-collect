Description
===========

Crossmon-collect is the gatering service for crossmon-server. 

Requirements
============

* [node.js](http://nodejs.org/) -- v0.8.0 or newer
* A running crossmon-server

Installation
============

    npm install crossmon-collect

A sample configuration file can be found in the module directory. 
At the startup crossmon-collect searches for a configuration file. This is the search order:

* /etc/crossmon/collect_config.json
* [module-home-directory]/collect_config.json
* [module-home-directory]/collect_config.sample.json