package com.stevevis.eventbus;

/**
 * Created by Steve on 10/30/15.
 */
public class EventBusTest {
    public static void main(String[] args) throws Exception {
        EventBus eventBus = new EventBus(100);

        Topic topicA = eventBus.registerTopic("TopicA");
        Topic topicB = eventBus.registerTopic("TopicB");

        Subscriber subscriberA = new PrintSubscriber("PrintSubscriberA");

        eventBus.subscribe(topicA, subscriberA);
        eventBus.subscribe(topicB, subscriberA);

        eventBus.publish(topicA, "This is a message to Topic A");
        eventBus.publish(topicB, "This is a message to Topic B");

        eventBus.unsubscribe(topicB, subscriberA);

        Subscriber subscriberB = new PrintSubscriber("PrintSubscriberB");
        eventBus.subscribe(topicB, subscriberB);

        eventBus.publish(topicA, "This is a message to Topic A");
        eventBus.publish(topicB, "This is a message to Topic B");
    }

    private static void printSubscribers(EventBus e, Topic t) {
        System.out.println("Subscribers to " + t.getId());
        for(Subscriber s : e.getSubscribersToTopic(t)) {
            System.out.println(s.getId());
        }
    }

    private static void printTopics(EventBus e, Subscriber s) {
        System.out.println("Topics subscribed to by " + s.getId());
        for(Topic t : e.getTopicsForSubscriber(s)) {
            System.out.println(t.getId());
        }
    }
}
