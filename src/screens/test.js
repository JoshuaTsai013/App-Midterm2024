{
    testdata.map((testItem, testIndex) => (
        <React.Fragment key={testIndex}>
            {testItem.data2 && testItem.data2.map((innerItem, innerIndex) => (
                <HStack alignItems='center' style={styles.card} key={`${testIndex}_${innerIndex}`}>
                    <VStack gap={5} style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardtitle}>{testItem.title}</Text>
                        <Text ml={2} numberOfLines={1} style={styles.cardDate}>{innerItem.date}</Text>
                        <HStack gap={5} mt={20} ml={2}>
                            <FontAwesome name='location-dot' size={16} color='#466A47' />
                            <Text numberOfLines={1} style={styles.cardLocation}>{innerItem.location}</Text>
                        </HStack>
                    </VStack>
                    <Pressable
                        style={styles.cardImage}
                        onPress={() => {
                            navigation.navigate('DetailScreen', { item: innerItem });
                        }}
                    >
                        <Image
                            source={innerItem.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </Pressable>
                </HStack>
            ))}
        </React.Fragment>
    ))
}
{
    (zoomRatio > 0.14) && testdata.map((testItem, testIndex) => {
        <React.Fragment key={testIndex}>
            {testItem.data2 && testItem.data2.map((innerItem, innerIndex) => {
                const scaleStyle = {
                    transform: [
                        {
                            scale: interpolations[innerIndex].scale,
                            // scale: 1,
                        },
                    ],
                };
                return (

                    <Marker
                        coordinate={innerItem.coordinate}
                        key={innerIndex}
                        onPress={(e) => onMarkerPress(e)}
                    >
                        <Animated.View style={styles.markerWrap}>
                            <Animated.Image
                                source={require('../../image/locationIcon.png')}
                                style={[styles.marker, scaleStyle]}
                                resizeMode="cover" />
                        </Animated.View>
                    </Marker>
                )
            })};
        </React.Fragment>
    })
}
const interpolations = testdata.map((marker, testIndex) => {
    <React.Fragment key={testIndex}>
        {testItem.data2 && testItem.data2.map((innerItem, innerIndex) => {
            const inputRange = [
                (testIndex - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (testIndex + 1) * CARD_WIDTH,
            ];
            const scale = mapAnimation.interpolate({
                inputRange,
                outputRange: [1, 1.5, 1],
                extrapolate: "clamp"
            });
            return { scale };
        })}
    </React.Fragment>
});