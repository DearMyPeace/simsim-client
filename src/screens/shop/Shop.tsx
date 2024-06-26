import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PieceShop from '@screens/shop/PieceShop';
import PurchaseHistory from '@screens/shop/PurchaseHistory';
import PsychologicalConsulting from '@screens/shop/PsychologicalConsulting';
import ArtworkShop from '@screens/shop/ArtworkShop';
import MyText from '@components/common/MyText';
import { fontBasic } from '@utils/Sizing';

export default function Shop() {
  const [selectedTab, setSelectedTab] = useState('조각충전');

  const renderContent = () => {
    switch (selectedTab) {
      case '조각충전':
        return <PieceShop />;
      case '구입내역':
        return <PurchaseHistory />;
      case '심리상담':
        return <PsychologicalConsulting />;
      case '작품상점':
        return <ArtworkShop />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[styles.navItem, selectedTab === '조각충전' && styles.selectedItem]}
          onPress={() => setSelectedTab('조각충전')}
        >
          <MyText style={selectedTab === '조각충전' ? styles.selectedText : styles.navText}>
            조각충전
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, selectedTab === '구입내역' && styles.selectedItem]}
          onPress={() => setSelectedTab('구입내역')}
        >
          <MyText style={selectedTab === '구입내역' ? styles.selectedText : styles.navText}>
            구입내역
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, selectedTab === '심리상담' && styles.selectedItem]}
          onPress={() => setSelectedTab('심리상담')}
        >
          <MyText style={selectedTab === '심리상담' ? styles.selectedText : styles.navText}>
            심리상담
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, selectedTab === '작품상점' && styles.selectedItem]}
          onPress={() => setSelectedTab('작품상점')}
        >
          <MyText style={selectedTab === '작품상점' ? styles.selectedText : styles.navText}>
            작품상점
          </MyText>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    alignItems: 'flex-end',
  },
  navItem: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderColor: '#ffcc00',
  },
  selectedItem: {
    height: 40,
    borderWidth: 1,
    backgroundColor: '#F1E0CC',
    borderColor: '#000',
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  navText: {
    fontSize: fontBasic,
    color: '#000',
  },
  selectedText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'GowunBatang-Bold',
  },
  content: {
    flex: 1,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
});
