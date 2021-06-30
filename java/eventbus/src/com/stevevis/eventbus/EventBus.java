package com.stevevis.eventbus;

import com.stevevis.eventbus.exceptions.DuplicateTopicException;
import com.stevevis.eventbus.exceptions.InvalidTopicException;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

/**
 * Created by Steve on 10/29/15.
 */
public class EventBus {
    private final HashMap<Topic, Set<Subscriber>> topicHash;
    private final HashMap<Subscriber, Set<Topic>> subscriberHash;
    private final Object subscribeLock;
    private final ExecutorService pool;

    public EventBus(int poolSize) {
        topicHash = new HashMap<>();
        subscriberHash = new HashMap<>();
        subscribeLock = new Object();
        pool = Executors.newFixedThreadPool(poolSize);
    }

    public void shutdown() {
        pool.shutdown();
    }

    public Topic registerTopic(String id) throws DuplicateTopicException {
        Topic topic = new Topic(id);
        if (topicHash.containsKey(topic)) {
            throw new DuplicateTopicException(topic);
        }
        topicHash.put(topic, new HashSet<Subscriber>());
        return topic;
    }

    public void subscribe(Topic topic, Subscriber subscriber) throws InvalidTopicException {
        synchronized(subscribeLock) {
            Set<Subscriber> subscribers = topicHash.get(topic);
            if (subscribers == null) {
                throw new InvalidTopicException(topic);
            }
            subscribers.add(subscriber);

            Set<Topic> topics = subscriberHash.get(subscriber);
            if (topics == null) {
                topics = new HashSet<Topic>();
                subscriberHash.put(subscriber, topics);
            }
            topics.add(topic);
        }
    }

    public void unsubscribe(Topic topic, Subscriber subscriber) {
        synchronized (subscribeLock) {
            Set<Subscriber> subscribers = topicHash.get(topic);
            if (subscribers != null) {
                subscribers.remove(subscriber);
            }

            Set<Topic> topics = subscriberHash.get(subscriber);
            if (topics != null) {
                topics.remove(topic);
            }
        }
    }

    public Subscriber[] getSubscribersToTopic(Topic topic) {
        Subscriber[] results = new Subscriber[]{};
        Set<Subscriber> subscribers = topicHash.get(topic);
        if (subscribers != null) {
            results = subscribers.toArray(results);
        }
        return results;
    }

    public Topic[] getTopicsForSubscriber(Subscriber subscriber) {
        Topic[] results = new Topic[]{};
        Set<Topic> topics = subscriberHash.get(subscriber);
        if (topics != null) {
            results = topics.toArray(results);
        }
        return results;
    }

    public void publish(Topic topic, Object message) throws InvalidTopicException {
        Set<Subscriber> subscribers = topicHash.get(topic);
        if (subscribers == null) {
            throw new InvalidTopicException(topic);
        }

        subscribers.iterator().forEachRemaining(subscriber -> {
            pool.execute(new Publisher(message, subscriber));
        });
    }

    private class Publisher implements Runnable {
        private Object message;
        private Consumer<Object> consumer;

        public Publisher(Object message, Consumer<Object> consumer) {
            this.message = message;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            consumer.accept(message);
        }
    }
}
