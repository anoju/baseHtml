<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="./include/meta.jsp" %>
<!-- 공통이 아닌 추가meta태그(기타 meta태그는 여기에~) -->
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<!-- //공통이 아닌 추가meta태그 -->

<%@ include file="./include/head.jsp" %>
<!-- 공통이 아닌 추가css,스크립트: -->
<script>
	$(function(){
		common.title('페이지 제목입니다.');
	});
</script>
<!-- //공통이 아닌 추가css,스크립트 -->
</head>
<body>
<article id="wrap">
	<%@ include file="./include/top.jsp" %><!-- 헤더 -->
	<%@ include file="./include/gnb.jsp" %><!-- 전체메뉴 -->

	<!-- 컨텐츠 시작 -->
	<div id="container">
		<section id="contents">
			<div class="section">
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
				컨텐츠~~ <br>
			</div>
		</section>
	</div>
	<!-- //컨텐츠 끝  -->

	<!-- 팝업 넣는 영역 -->
	<!-- 다른곳 말고 여기에 팝업들 넣어주세요~~ -->
	<!-- //팝업 넣는 영역  -->

	<%@ include file="./include/footer.jsp" %><!-- 푸터 -->
</article>
</body>
</html>