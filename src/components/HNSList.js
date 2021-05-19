import {
  Table,
  Checkbox,
  List,
  Button,
  Loader,
  Icon,
  FormInput,
} from 'semantic-ui-react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { client } from '../state/SkynetContext';
import { useState, useEffect } from 'react';

const HNSList = () => {
  const hnsEntries = useStoreState((state) => state.hns.hnsEntries);
  const [entries, setEntries] = useState([]);
  const { updateEntry, deleteEntry } = useStoreActions(
    (actions) => actions.hns
  );

  useEffect(() => {
    const transformEntries = async () => {
      var entries = await Promise.allSettled(
        hnsEntries.map(async (entry) => {
          const dataLinkUrl = await client.getSkylinkUrl(entry.dataLink, {
            subdomain: true,
          });
          const entryLinkUrl = await client.getSkylinkUrl(entry.entryLink, {
            subdomain: true,
          });

          const txtRecord = 'sia://' + entry.entryLink.split(':')[1];

          return { ...entry, dataLinkUrl, entryLinkUrl, txtRecord };
        })
      );

      entries = entries.map((entry) => {
        return entry.value;
      });

      setEntries(entries);
    };

    transformEntries();
  }, [hnsEntries]);

  // https://www.namebase.io/domain-manager/content-record
  return (
    // <Table striped celled singleLine>

    <>
      {!!entries.length && (
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>HNS Name</Table.HeaderCell>
              <Table.HeaderCell>Skylink</Table.HeaderCell>
              <Table.HeaderCell>DNS TXT Record (Entry Link)</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entries.map((hns, i) => {
              console.log('entry', hns);
              // const dataLinkUrl = await client.getLinkUrl(hns.dataLink, {
              //   subdomain: true,
              // });
              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    {hns.hnsName}
                    <Icon />
                  </Table.Cell>
                  <Table.Cell>
                    <a href={hns.dataLinkUrl} target="_blank">
                      {hns.dataLink}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a href={hns.entryLinkUrl} target="_blank">
                      {hns.txtRecord}
                    </a>
                  </Table.Cell>
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
              );
            })}
          </Table.Body>
        </Table>
      )}
    </>

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
