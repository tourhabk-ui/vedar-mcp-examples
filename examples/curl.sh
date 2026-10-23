#!/usr/bin/env sh
# List tools, then ask for the regional safety status and car rentals in Kamchatka.
U=https://vedarai.ru/api/mcp
H='-H content-type:application/json -H accept:application/json,text/event-stream'
curl -s $H -X POST $U -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
curl -s $H -X POST $U -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"safety_status","arguments":{}}}'
curl -s $H -X POST $U -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"search_car_rental","arguments":{"query":"SUV"}}}'
