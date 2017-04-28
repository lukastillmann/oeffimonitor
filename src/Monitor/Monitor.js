import React from 'react';

const Monitor = (props) => {
  const rbl = '402';
  fetch('/api?rbl=' + rbl)
    .then(
      function(response) {
        if (!response.ok) {
          console.log('error ' + response.status)
          return;
        }
        response.json()
          .then(
            function(data) {
              console.log('data');
              console.log(data);
            })
      }
    )
    .catch(
      function(err) {
        console.log('error ' + err);
      }
    );

  console.log('fetch');
  return (
    <div className="test">test</div>
  );
} 

export default Monitor;
