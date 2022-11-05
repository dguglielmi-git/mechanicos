import { Loader as LoaderSemantic } from 'semantic-ui-react';

export default function Loader(props) {
  const { label } = props;

  return (
    <LoaderSemantic active inverted inline>
      {label}
    </LoaderSemantic>
  );
}
