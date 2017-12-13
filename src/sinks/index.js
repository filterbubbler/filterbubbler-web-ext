import PopUpSink from './popup'
import DummySink from './dummy'
import FBSink from './fb-sink'

/*
 * Add additional sinks here
 */

export default {
    'DEFAULT': PopUpSink,
    'FBSINK': FBSink,
    'DUMMY': DummySink
}
