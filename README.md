## Intro
This project attempts to allow you to play Space Invaders in a browser using a Wii remote. It currently uses Python and Node.js to get information from the mote to the browser.

## Components

#### WiiMote Bluetooth Pairing
The project uses [CWiid](https://github.com/abstrakraft/cwiid) Python library to capture information from the Wii remote. This blog post was actually the inspriation for the entire project: [Wii Controller + Raspberry Pi + Python = Awesome!!](http://www.brianhensley.net/2012/08/wii-controller-raspberry-pi-python.html).

#### Python Sockets
The Python [websocket-client](http://pypi.python.org/pypi/websocket-client/0.8.0) is used to send messages from the Python program to the Node.js program.  The use of it is quite simple.

#### Space Invaders HTML
Travis is a coworker and awesome dev.  He built this a while back and I merely cloned it and converted the html to jade. Original repo [here](https://github.com/tmcwilliam/Space-Invaders)

## Hardware

1. RaspberryPi (I used a Model B rev2 running an up-to-date Raspbian)
2. Bluetooth dongle [check compatibility](http://elinux.org/RPi_VerifiedPeripherals#Working_Bluetooth_adapters)
3. Wii Remote

## Installation
First, a disclaimer: all work was done on a RaspberryPi running Debian Wheezy.  You mileage may vary as you stray farther from Debian.

#### Bluetooth

    sudo apt-get install bluetooth

You can see it working (or not) with the following:

    /etc/init.d/bluetooth status

If you'd like to scan for bluetooh devices, try this:

    hcitool scan

#### Python Libraries

    sudo apt-get install python-dev libevent-dev python-pip
    sudo apt-get install python-cwiid
    pip install websocket-client

To test that you have the py bits working run ``python python/wiimote.py``.

#### Node

    sudo apt-get install nodejs npm
    npm rebuild

## Running
If you're developing instead of just running:

    supervisor --watch . --extensions "node|js|jade|py" server.js

## Notes
* It took some time to find a pair of websocket libs that would allow that Python and Node.js to talk to each other. I settled on ``websocket-client`` and ``websocket.io`` because they worked.
* 

## TODO
* get the child spawn to keep python running after an exit
* re-work python loop so that moving and shooting can happen at the same time
* 
