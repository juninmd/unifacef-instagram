import { Alert, Image, RefreshControl, ScrollView, StyleSheet, Vibration, View } from 'react-native';
import { Avatar, Button, Card, Divider, Layout, Text } from '@ui-kitten/components';
import React, { Component, } from 'react';
import { inject, observer } from 'mobx-react';

import { Camera } from '../../components/camera.component';
import HomeStore from '../../stores/home.store';

interface Props {
  homeStore: HomeStore,
  navigation: any;
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const { getPosts } = this.props.homeStore;
    try {
      await getPosts();
    } catch (error) {
      Vibration.vibrate(3 * 1000)
      Alert.alert(
        "Erro",
        error.message
      );
    }
  }

  render() {

    const { posts, photoReady, toogleStatus, addPost, loading } = this.props.homeStore;

    const uploadPhoto = (uri?: string) => {
      if (uri) {
        Alert.alert(
          "Confirmação",
          "Deseja realmente postar?",
          [
            {
              text: "Cancelar",
              style: "cancel"
            },
            { text: "OK", onPress: () => addPost(uri) }
          ],
          { cancelable: false }
        );
      }
      toogleStatus(false);
    }

    return (
      <Layout style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => this.getPosts()} />
          }>
          <Camera status={photoReady} onTakeCamera={(uri) => uploadPhoto(uri)} />
          {photoReady === false && <Button onPress={() => toogleStatus(true)}>Postar</Button>}
          {photoReady === false && posts.map((post, index) => (
            <Card key={index} style={styles.card}>
              <View style={styles.header}>
                <Avatar
                  size={'small'}
                  source={{ uri: post.author.avatar }}
                  style={styles.avatar} />
                <Text style={styles.title}>{post.author.name}</Text>
              </View>
              <Image style={styles.picture} source={{ uri: post.image }} />
              <Divider />
              <View style={styles.footer}>
                <Text style={styles.title}>{post.description}</Text>
              </View>
            </Card>))}
        </ScrollView>
      </Layout>);
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 1,
    margin: 4,
    backgroundColor: 'black'
  },
  header: {
    padding: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollView: {
    backgroundColor: 'black',
    color: 'white',
    marginHorizontal: 20,
  },
  avatar: {
    marginRight: 5
  },
  picture: {
    width: 'auto',
    minHeight: 200,
    maxHeight: 500
  },
  footer: {
    margin: 4,
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 15
  }
})