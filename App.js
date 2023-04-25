import React, { useState, useEffect, useMemo } from 'react';
import { Audio } from 'expo-av';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Animated,
  Vibration,
} from 'react-native';

export default function App() {
  const [gameState, setGameState] = useState('start');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [introSound, setIntroSound] = useState(null);
  const [gameSound, setGameSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [winSound, setWinSound] = useState(null);
  const [winAnimation, setWinAnimation] = useState(false);
  const [bgColor, setBgColor] = useState(new Animated.Value(0));
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [winBgColor, setWinBgColor] = useState(new Animated.Value(0));
const [loseBgColor, setLoseBgColor] = useState(new Animated.Value(0));
 const [showInfoBox, setShowInfoBox] = useState(false);


  const messages = [
    "You have been Jesse the ferret VERY CROSS.",
      "You have angered the ferret. Get out. NOW.",
      "Pathetic. The ferret hates you. Leave.",
      "If the ferret could speak, he'd tell you to get the **** outta here.",
      "The ferret has pulled a lever, and you are plummeting to your death out the moon door.",
      "The ferret jumped off a cliff after that effort.",
      "The ferret has fallen into clinical depression after that.",
      "The ferret is disappointed in how bad you were.",
      "The ferret says, you either get it bang on 5.00, or you suck. There is no in-between. So you suck. Sorry.",
      "The Time Game? More like, Your Times Lame. Try again.",
            "The ferret says you suck. SUUUUUCK.",
"The Ferret Has Unfriended You.",
"The ferret says BOOOOOOOOOOO.",
"You made the ferret cry.",
"You still here? Look at this point, the ferret is pretty impressed.",
"I mean, the ferret keeps saying mean stuff to you, and you’re still here.",
"Trying your hardest. But it's still not good enough for the ferret.",
"The ferret admires your tenacity. That time still sucked though.",
"You are making the ferrets skin condition flare up.",
"The ferret hates you with every fibre of his being.",
"Look the ferret wants to know, no-ones ever played for this long. Are you okay?.",
"You have given the ferret explosive diarrhoea.",
"If the ferret could read, he'd be very disappointed with that effort.",
"The ferret was into you before that, but that gave him the ick big time.",
"The ferret is questioning why he even agreed to be a part of this game.",
"The ferret is starting to lose faith in humanity because of you.",
"The ferret is considering hiring a coach to help you improve.",
"The ferret is questioning why he even bothers to play this game with you.",
"The ferret is starting to feel sorry for you.",
"The ferret is considering ending this friendship because of your bad timing.",
"The ferret is starting to think he's wasting his time playing this game with you.",
"The ferret is starting to think you're trolling him.",
"The ferret is starting to think you're not even trying.",
"Your timing is so bad, it's making the ferret want to break things.",
"The ferret is starting to think you're a lost cause.",
"That was worse than a bad blind date. And the ferret has been on HEAPS of blind dates.",
"Your timing is so bad, it's making the ferret want to switch to a different game.",
"The ferret is starting to think you're not even aware there's a timer in this game.",
"That was like watching a horror movie, but without the suspense.",
"Your timing is so bad, it's making the ferret want to gouge out his eyes.",
"The ferret is starting to think you're not even trying to win.",
"That was worse than a bad case of hiccups.",
"Your timing is so bad, it's making the ferret want to go back in time and never play this game.",
"The ferret is starting to think you're sabotaging him.",
"Your timing is so bad, it's making the ferret want to give up on humanity.",
"The ferret is starting to wonder if you even know what timing means.",
"That was worse than a bad haircut and a bad blind date combined. And the ferret has had heaps of both.",
"Your timing is so bad, it's making the ferret want to invent a time machine just so he can go back and warn you not to play this game.",
"The ferret is starting to think he's in the Twilight Zone playing with you.",
"That was like watching a car crash into a train, into a plane, into a boat, into a shark, into a tornado.",
"Your timing is so bad, it's making the ferret want to move to a different planet.",
"The ferret is starting to think he's cursed to play this game with you forever.",
"Your timing is so bad, it's making the ferret want to join a monastery and meditate for the rest of his life.",
"The ferret is starting to think you're trying to make him lose his mind.",
"Your timing is so bad, it's making the ferret want to delete this game and never look back.",
"The ferret is starting to think you're the unluckiest person on the planet.",
"That was worse than a bad dream that you can't wake up from.",
"The ferret is starting to think you're a secret agent sent to destroy this game.",
"Your timing is so bad, it's making the ferret want to scream into a pillow.",
"The ferret is starting to think you're a glitch in the matrix.",
"Your timing is so bad, it's making the ferret want to give up on the concept of time altogether.",
"The ferret is starting to think you're a cursed object.",
"Your timing is so bad, it's making the ferret want to burn all his devices.",
"The ferret is starting to think you're a virus.",
"Your timing is so bad, it's making the ferret want to scream into the void.",
"The ferret is starting to think you're a black hole that sucks in all the good timing from the universe.",
"Your timing is so bad, it's making the ferret want to run away and never come back.",
"The ferret is starting to think you're a curse on this game.",
"Your timing is so bad, it's making the ferret want to go back to the Big Bang and start all over.",
"The ferret is starting to think you're the jester of bad timing.",
"Your timing is so bad, it's making the ferret want to throw his phone out the window and watch it shatter into a million pieces.",
"The ferret is starting to think you're a glitch in the space-time continuum.",
"Your timing is so bad, it's making the ferret want to teleport to a different dimension.",
"The ferret is starting to think you're a cosmic joke.",
"Your timing is so bad, it's making the ferret want to cry tears of frustration.",
"The ferret is starting to think you're a time-traveling disaster.",
"Your timing is so bad, it's making the ferret want to call NASA and ask if they can reset the clock on the universe.",
"The ferret is starting to think you're a lost cause when it comes to timing.",
"Your timing is so bad, it's making me want to put my device in the microwave and watch it explode.",
"The ferret is starting to think you're a curse on all timing-related games.",
"That was worse than a bad hair day and a bad flu combined.",
"Your timing is so bad, it's making the ferret want to invent a new way to measure time just so you can't play this game anymore.",
"The ferret is starting to think you're a time vampire that sucks the good timing out of everyone around you.",
"Your timing is so bad, it's making the ferret want to climb to the top of Mount Everest and scream into the void.",
"The ferret is starting to think you're a time traveler from a dystopian future where timing is a forgotten art.",
"Your timing is so bad, it's making the ferret want to dig a hole to the center of the Earth and bury my device.",
"The ferret is starting to think you're a demon sent from the underworld to ruin this game.",
"The ferret is starting to think you're a cursed artifact that brings bad timing to everyone who comes into contact with it.",
"That was worse than a bad dream where you're being chased by a giant ferret.",
"Your timing is so bad, it's making the ferret want to give up on the concept of time altogether and live like a hermit in the woods.",
"Your timing is so bad, it's making the ferret want to go back in time and stop himself from ever inventing this game.",
"The ferret is starting to think you're a bad luck charm that brings bad timing to everything you touch.",
"That was worse than a bad day at work and a bad cold combined.",
"The ferret is starting to think you're a plague that spreads bad timing everywhere you go.",
"The ferret is starting to think you're a curse that has been placed on the universe to ruin all timing-related games.",
  ];

  useEffect(() => {
    let intro;
    let game;
    let lose;
    let win;

    const loadAudio = async () => {
      intro = new Audio.Sound();
      await intro.loadAsync(require('./assets/intro.mp3'));
      setIntroSound(intro);
      await intro.playAsync();

      game = new Audio.Sound();
      await game.loadAsync(require('./assets/game.mp3'));
      setGameSound(game);

      lose = new Audio.Sound();
      await lose.loadAsync(require('./assets/lose.mp3'));
      setLoseSound(lose);

      win = new Audio.Sound();
      await win.loadAsync(require('./assets/win.mp3'));
      setWinSound(win);
    };

    loadAudio();

    return () => {
      intro?.unloadAsync();
      game?.unloadAsync();
      lose?.unloadAsync();
      win?.unloadAsync();
    };
  }, []);

  const triggerVibration = () => {
    Vibration.vibrate(10); // Vibrate for 50 milliseconds
  };

   const openInfoBox = () => {
    setShowInfoBox(true);
      };

      const closeInfoBox = () => {
    setShowInfoBox(false);
  };

const startGame = async () => {
  triggerVibration();
  setGameState('stop');
  setStartTime(Date.now());
  const newTimerId = setTimeout(lostGame, 9999900);
  setTimerId(newTimerId);

  if (introSound) {
    await introSound.stopAsync();
    introSound.setOnPlaybackStatusUpdate(null);
  }
  if (gameSound) {
    await gameSound.replayAsync();
  }
  setLoseBgColor(new Animated.Value(0)); // Reset loseBgColor when the game restarts
  loseBgColor.setValue(0); // Reset the background color immediately
};

  const stopGame = async () => {
    triggerVibration();
    clearTimeout(timerId);
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;
    setTimeElapsed(elapsedTime.toFixed(2));

    if (gameSound) {
      await gameSound.stopAsync();
    }

    if (elapsedTime >= 4.995 && elapsedTime <= 5.005) {
      setGameState('won');
      setWinAnimation(true);
if (winSound) {
await winSound.replayAsync();
}
startWinAnimation();
} else {
setGameState('lost');
setMessageIndex((messageIndex + 1) % messages.length);
if (loseSound) {
await loseSound.replayAsync();
}
startLoseAnimation();
}
};

const lostGame = () => {
setGameState('lost');
setMessageIndex((messageIndex + 1) % messages.length);
};

const startWinAnimation = () => {
  Animated.sequence([
    Animated.timing(winBgColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }),
    Animated.timing(winBgColor, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }),
  ]).start(() => {
    if (winAnimation) {
      startWinAnimation();
    }
  });
};

const startLoseAnimation = () => {
  Animated.timing(loseBgColor, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();
};

const interpolateBgColor = useMemo(() => {
  return bgColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      'rgba(9,34,64,255)',
      'rgba(0,255,0,1)', // Green color for winning
      'rgba(255,0,0,1)', // Red color for losing
    ],
  });
}, [bgColor]);

const interpolateWinBgColor = useMemo(() => {
  return winBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(9,34,64,255)', 'rgba(0,255,0,1)'],
  });
}, [winBgColor]);

const interpolateLoseBgColor = useMemo(() => {
  return loseBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(9,34,64,255)', 'rgba(255,0,0,1)'],
  });
}, [loseBgColor]);

const closeSplashScreen = () => {
setShowSplashScreen(false);
};



  const renderContent = () => {
    if (showSplashScreen) {
      return (
        <>
          <Text style={styles.text}>
              <Text style={{fontWeight: 'bold', fontSize: 36}}>Carrie & Tommy's Time Game Trainer!</Text>{'\n\n'}
  Can you hit <Text style={{fontWeight: 'bold'}}>STOP</Text> on <Text style={{fontWeight: 'bold'}}>EXACTLY FIVE SECONDS</Text> after pressing <Text style={{fontWeight: 'bold'}}>START</Text>, or will you make Jesse The Ferret <Text style={{fontWeight: 'bold'}}>MAD?!</Text>{'\n\n'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={closeSplashScreen}>
            <Text style={styles.buttonText}><Text style={{fontWeight: 'bold', fontSize: 45}}>LET'S PLAY!</Text></Text>
          </TouchableOpacity>
        </>
      );
    } else {
      if (gameState === 'start') {
        return (
          <>
            <Text style={styles.text}>
              Okay here we go!{'\n\n'} Remember, press <Text style={{fontWeight: 'bold'}}>STOP</Text> on <Text style={{fontWeight: 'bold'}}>EXACTLY 5.00 seconds</Text> or Jesse the Ferret will be real cross with you. Press <Text style={{fontWeight: 'bold'}}>START</Text> to begin!
            </Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </>
        );
      } else if (gameState === 'stop') {
        return (
          <>
            <Text style={styles.text}><Text style={styles.text}>
  Press <Text style={{fontWeight: 'bold'}}>Stop</Text> exactly on <Text style={{fontWeight: 'bold'}}>5.00 seconds</Text>!
</Text></Text>
            <TouchableOpacity style={styles.button} onPress={stopGame}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </>
        );
      } else if (gameState === 'won') {
        return (
          <>
            <Text style={styles.text}>
              Congratulations <Text style={{fontWeight: 'bold'}}>TIME MASTER</Text>, you have won Carrie & Tommy's <Text style={{fontWeight: 'bold'}}>TIME GAME TRAINER</Text>! Jess the ferret <Text style={{fontWeight: 'bold'}}>LOVES</Text> you!{'\n\n'} Now play the real thing with Carrie & Tommy!
            </Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </>
        );
      } else if (gameState === 'lost') {
        return (
          <>
            <Text style={styles.text}>
              {messages[messageIndex]} Your time was {timeElapsed}.
            </Text>
            <TouchableOpacity style={styles.button} onPress={startGame}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </>
        );
      }
    }
    
  };

  return (
  <Animated.View
    style={[
      styles.container,
      { backgroundColor: gameState === "won" ? interpolateWinBgColor : interpolateLoseBgColor },
    ]}
  >
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Image
        source={require("./assets/cnt.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>

    {/* Add the "Info" button */}
    <TouchableOpacity style={styles.infoButton} onPress={openInfoBox}>
      <Text style={styles.infoButtonText}>Info</Text>
    </TouchableOpacity>

    {/* Add the info box conditionally */}
    {showInfoBox && (
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Carrie & Tommy's Time Game Trainer is an app designed to get you ready for the REAL THING! We play this game LIVE every Wednesday on our radio show. Click <Text style={{fontWeight: 'bold', color: 'blue'}} onPress={() => Linking.openURL('https://www.listnr.com/podcasts/carrie-and-tommy')}>HERE</Text> to listen to Carrie & Tommy's podcast and hear it for yourself!
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeInfoBox}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    )}

    {renderContent()}

    <Image
      source={
        gameState === 'won'
          ? require('./assets/ferretwin.png')
          : gameState === 'lost'
          ? require('./assets/ferretlose.png')
          : require('./assets/ferret.png')
      }
      style={styles.backgroundImage}
      resizeMode="contain"
    />
  </Animated.View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
    color: '#FFF',
  },
  button: {
    backgroundColor: 'rgba(89,192,217,1)',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 36,
 
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: undefined,
    aspectRatio: 1,
  },
  infoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(9, 34, 64, 0.72)',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
     opacity: 1,
     zIndex: 9999
  },
  infoBox: {
    position: 'absolute',
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    opacity: 1,
    zIndex: 9999
  },
  infoBoxText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
     opacity: 1,
     zIndex: 9999
  },
  closeButton: {
    backgroundColor: 'rgba(89,192,217,1)',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
     opacity: 1,
     zIndex: 9999
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    opacity: 1,
     zIndex: 9999
  },

});
