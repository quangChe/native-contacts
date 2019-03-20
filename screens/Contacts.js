import React from 'react';
import {
  StyleSheet, 
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import ContactListItem from '../components/ContactListItem';
import {fetchContacts} from '../utils/api';
import colors from '../utils/colors';

const keyExtractor = ({phone}) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation: {toggleDrawer}}) => ({
    title: 'All Contacts',
    headerBackTitle: 'Contacts',
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{color: colors.black, marginLeft: 10}}
        onPress={() => toggleDrawer()}/>
    )
  });

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
    const {navigation: {navigate}} = this.props;

    return(
      <ContactListItem 
        name={name} 
        avatar={avatar} 
        phone={phone}
        onPress={() => navigate('Profile', {contact: item})}/>
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