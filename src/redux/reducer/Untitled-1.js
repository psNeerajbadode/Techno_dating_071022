<Grid
  style={{
    // width: (dimension.width - 60) / 2,
    // height: 223,
    // backgroundColor: 'red',
    marginVertical: 10,
    marginHorizontal: 20,
    flexWrap: 'wrap',
  }}
>
  {Array(5)
    .fill('')
    .map((it, i) => (
      <Col
        style={{
          height: i == 0 ? 100 : i == 1 ? 150 : i == 2 ? 200 : 300,
          width: (dimension.width - 70) / 2,
          backgroundColor: 'red',
          margin: 1,
        }}
      >
        <Text>Fixed width</Text>
      </Col>
    ))}
  <Col style={{ height: 100, width: (dimension.width - 40) / 2, backgroundColor: 'green' }}>
    <Text>Fixed width</Text>
  </Col>
</Grid>;
{
  /* ))} */
}
{
  /* </View> */
}
<Grid>
  <Col style={{ height: 40 }}>
    <Text>Fixed width</Text>
  </Col>
</Grid>;
// npm i react-native-geolocation-service
