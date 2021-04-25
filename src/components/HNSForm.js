import { Form, Input, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

function HNSForm() {
  const { loggedIn } = useStoreState((state) => state.mySky);
  const createEntry = useStoreActions((actions) => actions.hns.createEntry);
  const [hnsName, setHnsName] = useState('');
  const [dataLink, setDataLink] = useState('');
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input label="HNS Name">
          <Input
            placeholder="appName"
            label={{ basic: true, content: '.hns/' }}
            labelPosition="right"
            onChange={(e) => setHnsName(e.target.value)}
            value={hnsName}
          />
        </Form.Input>
        <Form.Input label="Skylink (Base64)">
          <Input
            placeholder="skylink"
            label={{ basic: true, content: 'sia://' }}
            onChange={(e) => setDataLink(e.target.value)}
            value={dataLink}
          />
        </Form.Input>
      </Form.Group>
      <Button
        onClick={() => createEntry({ hnsName, dataLink })}
        disabled={!loggedIn}
      >
        {loggedIn ? 'Add HNS Entry' : 'Login Required'}
      </Button>
    </Form>
  );
}

export default HNSForm;
