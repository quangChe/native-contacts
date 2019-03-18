import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from '../utils/api';

const keyExtractor = ({phone}) => phone;

export default class Contacts extends React.Component {
  state = {
    contacts: [],
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();
      this.setState({contacts, loading: false, error: false});
    } catch (err) {
      this.setState({loading: false, error: true});
    }
  }

  renderContact = ({item}) => {
    const {name, avatar, phone} = item;
    const {navigation} = this.props;

    return(
      <ContactListItem 
        name={name} 
        avatar={avatar} 
        phone={phone}
        onPress={() => navigation.navigate('Profile')}/>
    );
  }

  render() {
    const {loading, contacts, error} = this.state;
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

    return( 
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large"/>}

        {error && <Text>Unexpected error...</Text>}

        {!loading && 
          !error && (
            <FlatList
              data={sortedContacts}
              keyExtractor={keyExtractor}
              renderItem={this.renderContact}>
            </FlatList>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});