import React from "react";
import { ErrorSection } from "aws-amplify-react";

const Error = errors => (
  <pre className='error'>
    {ErrorSection.map(({ message }, i) => (
      <div key={i}>
        {message}
      </div>
    ))}
  </pre >
);

export default Error;
