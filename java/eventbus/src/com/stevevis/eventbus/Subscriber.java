package com.stevevis.eventbus;

import java.util.function.Consumer;

/**
 * Created by Steve on 10/29/15.
 */
public interface Subscriber extends Consumer<Object> {
    public String getId();
}
