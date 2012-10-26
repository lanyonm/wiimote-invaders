#!/usr/bin/env python

import cwiid
import websocket
import time


def main():

    print 'Press button 1 + 2 on your Wii Remote...'
    wm = cwiid.Wiimote()

    ws = websocket.WebSocket()
    ws.connect('ws://localhost:3100')

    print 'Wii Remote connected...'
    print '\nPress the PLUS button to disconnect the Wii and end the application'

    time.sleep(1)

    Rumble = False
    wm.rpt_mode = cwiid.RPT_BTN

    #
    # We're going to create a simple state machine.
    #
    movementInterval = .01
    oldState = 0
    currState = 0

    while True:
        currState = wm.state['buttons']
        if wm.state['buttons'] == 2048:
            currState = wm.state['buttons']
            ws.send("leftDown")
            print 'Left'
            time.sleep(movementInterval)
        elif wm.state['buttons'] == 1024:
            currState = wm.state['buttons']
            ws.send("rightDown")
            print 'Right'
            time.sleep(movementInterval)
        else:
            if oldState == 2048 and currState != 2048:
                print 'left button up'
                ws.send("leftUp")
            if oldState == 1024 and currState != 1024:
                print 'right button up'
                ws.send("rightUp")
        oldState = currState

        if wm.state['buttons'] == 512:
            print '"Up" pressed'
            ws.send("shoot")
            time.sleep(.15)
        if wm.state['buttons'] == 2:
            print 'Button 1 pressed'
            ws.send("shoot")
            time.sleep(.15)
        if wm.state['buttons'] == 1:
            print 'Button 2 pressed'
            ws.send("shoot")
            time.sleep(.15)
        if wm.state['buttons'] == 16:
            if Rumble == False:
                wm.rumble = True
                Rumble = True
                time.sleep(.3)
            elif Rumble == True:
                wm.rumble = False
                Rumble = False
                time.sleep(.3)
        if wm.state['buttons'] == 4096:
            print 'closing Bluetooth connection. Good Bye!'
            time.sleep(1)
            exit(wm)

if __name__ == '__main__':
    main()
