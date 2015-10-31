package com.stevevis.eventbus;

/**
 * Created by Steve on 10/30/15.
 */
public class PrintSubscriber implements Subscriber {
    private String id;

    public PrintSubscriber(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public void accept(Object o) {
        System.out.println(this.id + ": " + o);
    }
}
