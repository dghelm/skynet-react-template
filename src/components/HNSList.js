import { Table, Checkbox, List, Button, Loader, Icon } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const HNSList = () => {
  const hnsEntries = useStoreState((state) => state.hns.hnsEntries);
  const { updateEntry, deleteEntry } = useStoreActions(
    (actions) => actions.hns
  );
  // https://www.namebase.io/domain-manager/content-record
  return (
    // <Table striped celled singleLine>
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>HNS Name</Table.HeaderCell>
          <Table.HeaderCell>Skylink</Table.HeaderCell>
          <Table.HeaderCell>DNS TXT Record (Entry Link)</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {hnsEntries.map((hns, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              {hns.hnsName}
              <Icon />
            </Table.Cell>
            <Table.Cell>{hns.dataLink}</Table.Cell>
            <Table.Cell>{hns.entryLink}</Table.Cell>
            <Table.Cell>
              <Button
                compact
                basic
                color="red"
                icon="delete"
                // floated="right"
                onClick={(e, elem) => {
                  deleteEntry({ elem, i });
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>

    // <List divided relaxed>
    //   {hnsEntries.map((hns, i) => (
    //     <List.Item key={i}>
    //       {hns.hnsName}
    //       {hns.dataLink}
    //       {hns.entryLink}

    //       <Button
    //         compact
    //         basic
    //         color="red"
    //         icon="delete"
    //         floated="right"
    //         onClick={(e, elem) => {
    //           deleteEntry({ elem, i });
    //         }}
    //       />
    //     </List.Item>
    //   ))}
    // </List>
  );
};

export default HNSList;
