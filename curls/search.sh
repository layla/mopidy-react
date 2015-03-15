curl -X POST -H Content-Type:application/json -d '{
  "method": "core.library.find_exact",
  "jsonrpc": "2.0",
  "params": {
    "query": {
      "any": ["love"]
    },
    "uris": ["spotify:"]
  },
  "id": 1
}' http://localhost:6680/mopidy/rpc
