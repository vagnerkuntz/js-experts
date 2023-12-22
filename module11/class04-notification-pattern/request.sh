echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 30}'

echo $'\n\n[requesting: invalid age]'
curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 10}'

echo $'\n\n[requesting: invalid name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 30}'

echo $'\n\n[requesting: all invalid]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 10}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "error"}'
