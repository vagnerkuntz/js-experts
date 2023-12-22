echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 30}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 10}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 30}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "error"}'
