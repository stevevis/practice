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

        System.out.println("Subscribing subscriberA to topicA and topicB");
        eventBus.subscribe(topicA, subscriberA);
        eventBus.subscribe(topicB, subscriberA);

        System.out.println("Sending message to topicA");
        eventBus.publish(topicA, "This is a message to Topic A");
        System.out.println("Sending message to topicB");
        eventBus.publish(topicB, "This is a message to Topic B");

        System.out.println("Unsubscribing subscriberA from topicB");
        eventBus.unsubscribe(topicB, subscriberA);

        Subscriber subscriberB = new PrintSubscriber("PrintSubscriberB");

        System.out.println("Subscribing subscriberB to topicB");
        eventBus.subscribe(topicB, subscriberB);

        System.out.println("Sending message to topicA");
        eventBus.publish(topicA, "This is a message to Topic A");
        System.out.println("Sending message to topicB");
        eventBus.publish(topicB, "This is a message to Topic B");

        eventBus.shutdown();
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
