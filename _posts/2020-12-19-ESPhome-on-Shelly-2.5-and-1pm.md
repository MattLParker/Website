---
title:  "Deploy Shelly 2.5 and 1pm using ESPhome and HomeAssistant"
date:   2020-12-19
tags: ESPHome Homeassistant
categories: IOT Homeassistant ESPHome
layout: post
---
Shelly has been making some great products that can be integrated into Homeassistant. Now generally they work fine with Homeassistant out of the box, but I wanted to run a firmware that I knew what was going on in the background and did not phone home for any reason. I as a rule block outbound to the internet traffic for my IOT devices, there is no reason they should be accessible from or to the internet.

Converting the Shelly devices to a custom written firmware is simple. Follow the current instructions for getting the Shelly device on your network. Once there [yaourdt](https://github.com/yaourdt) has created a conversion firmware for Shelly. You can simply use the url provided in his repo at [https://github.com/yaourdt/mgos-to-tasmota](https://github.com/yaourdt/mgos-to-tasmota). Basically using the Shelly OTA mechanism you can point to the github repo. This will convert the Shelly to Tasmota. If you prefer to stay there this will be all you need, yaourdt provides Tasmota configs for most of the Shelly Line. 

I however prefer to have my devices where possible running ESPHome as I much prefer to have the configs in YAML and be able to back the code up simply. From here some of the shelly devices do not have enough memory to flash straight to ESPhome. After getting the device back on the network using standard Tasmota settings, you will need to first flash to the minimal install of Tasmota. If you go to firmware upgrade at the main menu you can supply an OTA url to flash. Using the Tasmota Repo you can use the URL of [http://ota.tasmota.com/tasmota/release/tasmota-minimal.bin](http://ota.tasmota.com/tasmota/release/tasmota-minimal.bin) to "upgrade" Tasmota to the minimal install. Wait for the device to reload and then you can upload the ESP home bin file and flash straight to ESPhome. There is a known bug in ESPhome, or rather inconvenience that after flashing to ESPHome for the power sensor to work correctly, you will need to also power cycle the Shelly device. A baseline config for most devices can be found at [ESPHome Devices](https://www.esphome-devices.com/devices/shelly-25/)

#### Warning
On the configs due to an issue with the IRQ pin of the energy monitoring chip on devices that do power monitoring, such as the 2.5 or the 1pm, you will need to add the following to your config. or else the device will become **significantly** hotter than normal operating temperatures.
```
binary_sensor:
  - platform: gpio
    pin: GPIO16
    name: "ade7953 IRQ pin"
    internal: true
```

