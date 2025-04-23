import { listenToComments } from "../../../../services/comment.service";
import { getAllUsers, getUserData } from "../../../../services/user.service";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../../../../config/firebaseConfig";
import { User } from "../../../../types/user";
import React from "react";

interface CommentData {
  id?: string;
  content: string;
  createdAt: any;
  createdBy?: {
    id?: string;
  };
}

interface CommentWithUserInfo extends CommentData {
  userInfo?: {
    fullName: string;
    role: string;
  };
}

const CommentsScreen = () => {
  const { id } = useLocalSearchParams();
  const idTicket = id as string;
  const [comments, setComments] = useState<CommentWithUserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [usersMap, setUsersMap] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);

        const usersById: { [key: string]: User } = {};
        allUsers.forEach(user => {
          if (user.userId) {
            usersById[user.userId] = user;
          }
        });

        setUsersMap(usersById);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      }
    };

    loadUsers();
  }, []);
  
  const getDateFromTimestamp = (timestamp: any): Date => {
    if (!timestamp) return new Date(0); 

    try {
      if (typeof timestamp.toDate === 'function') {
        return timestamp.toDate();
      }
      else {
        return new Date(timestamp);
      }
    } catch (error) {
      console.error("Erreur lors de la conversion de la date:", error);
      return new Date(0);
    }
  };

  useEffect(() => {
    if (idTicket && Object.keys(usersMap).length > 0) {
      const unsubscribeComments = listenToComments(idTicket, (data) => {
        if (data.length > 0) {
        }

        const enhancedComments = data.map(comment => {
          const userId = comment.userId?.id;
          const user = userId ? usersMap[userId] : null;

          if (user) {
            (`Utilisateur trouvé pour le commentaire: ${user.fullName}`);
            return {
              ...comment,
              userInfo: {
                fullName: user.fullName || "Utilisateur inconnu",
                role: user.role || "inconnu"
              }
            };
          } else {
            return {
              ...comment,
              userInfo: {
                fullName: "Utilisateur inconnu",
                role: "inconnu"
              }
            };
          }
        });
        
        const sortedComments = [...enhancedComments].sort((a, b) => {
          const dateA = getDateFromTimestamp(a.createdAt);
          const dateB = getDateFromTimestamp(b.createdAt);
          return dateB.getTime() - dateA.getTime(); 
        });

        setComments(sortedComments);
        setLoading(false);
        
      });

      return () => unsubscribeComments();
    }
  }, [idTicket, usersMap]);

  const formatDate = (createdAt: any): string => {
    if (!createdAt) return "Date inconnue";

    try {
      if (typeof createdAt.toDate === 'function') {
        return createdAt.toDate().toLocaleString('fr-FR');
      }
      else {
        const date = new Date(createdAt);
        return date.toLocaleString('fr-FR');
      }
    } catch (error) {
      console.error("Erreur lors du formatage de la date:", error);
      return "Date invalide";
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  if (comments.length === 0) {
    return <Text style={styles.emptyMessage}>Aucun commentaire</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {comments.map((comment, index) => (
        <View key={comment.id || index} style={styles.commentContainer}>
          <Text style={styles.commentHeader}>
            Le {formatDate(comment.createdAt)} par M(me) {' '}
            <Text style={styles.userName}>{comment.userInfo?.fullName}</Text>{' '}
            ({comment.userInfo?.role === "employee" ? "employé" : comment.userInfo?.role})
          </Text>
          <Text style={styles.commentContent}>{comment.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  },
  commentContainer: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3'
  },
  commentHeader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  userName: {
    fontWeight: 'bold',
    color: '#333'
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20
  }
});

export default CommentsScreen;