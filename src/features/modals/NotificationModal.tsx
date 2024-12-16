import { useVendor } from '../../layouts/hooks/useVendor';
import { format } from 'date-fns';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
} from "@chakra-ui/react";

export interface Notification {
  _id: string;
  content: string;
  is_read: boolean;
  createdAt: string;
  title: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, useMarkNotificationAsRead: markAsRead } = useVendor();

  const notificationsList = notifications?.data?.data || [];
  const unreadNotifications = notificationsList.filter((n: Notification) => !n.is_read);
  const readNotifications = notificationsList.filter((n: Notification) => n.is_read);

  const handleNotificationClick = (notificationId: string) => {
    markAsRead.mutate(notificationId);
  };

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Notifications
          {unreadNotifications.length > 0 && (
            <Badge ml={2} colorScheme="red">
              {unreadNotifications.length}
            </Badge>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs>
            <TabList>
              <Tab
                _selected={{
                  color: "#FF5733",
                  borderColor: "#FF5733",
                  borderBottom: "2px solid",
                }}
              >
                Unread ({unreadNotifications.length})
              </Tab>
              <Tab
                _selected={{
                  color: "#FF5733",
                  borderColor: "#FF5733",
                  borderBottom: "2px solid",
                }}
              >
                Read ({readNotifications.length})
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="start" width="100%">
                  {unreadNotifications.length === 0 ? (
                    <Text color="gray.500">No unread notifications</Text>
                  ) : (
                    unreadNotifications.map((notification:any) => (
                      <VStack
                        key={notification._id}
                        align="start"
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        width="100%"
                        cursor="pointer"
                        onClick={() => handleNotificationClick(notification._id)}
                        _hover={{ bg: 'gray.100' }}
                      >
                        <Text fontWeight="bold">{notification.title}</Text>
                        <Text>{notification.content}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {formatTimestamp(notification.createdAt)}
                        </Text>
                      </VStack>
                    ))
                  )}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="start" width="100%">
                  {readNotifications.length === 0 ? (
                    <Text color="gray.500">No read notifications</Text>
                  ) : (
                    readNotifications.map((notification:any) => (
                      <VStack
                        key={notification._id}
                        align="start"
                        p={3}
                        borderRadius="md"
                        width="100%"
                      >
                        <Text color="gray.500" fontWeight="bold">{notification.title}</Text>
                        <Text color="gray.500">{notification.content}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {formatTimestamp(notification.createdAt)}
                        </Text>
                      </VStack>
                    ))
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
