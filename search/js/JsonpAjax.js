$(function(){
//当键盘键被松开时发送Ajax获取数据
		$('#keywords').keyup(function(){
			var keywords = $(this).val();
			if (keywords=='') { $('#word').hide(); return };
			$.ajax({
				url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + keywords,
				dataType: 'jsonp',
				jsonp: 'cb', //回调函数的参数名(键值)key
				// jsonpCallback: 'fun', //回调函数名(值) value
				beforeSend:function(){
					$('#word').append('<div>正在为您加载。。。</div>');
				},
				success:function(data){
					$('#word').empty().show();
					if (data.s=='')
					{
						$('#word').append('<div class="error">似乎没有找到您要的 "' + keywords + '"</div>');
					}
					$.each(data.s, function(){
						$('#word').append('<div class="click_work">'+ this +'</div>');
					})
				},
				error:function(){
					$('#word').empty().show();
					$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
				}
			})
		})
		//点击搜索数据复制给搜索框
		$(document).on('click','.click_work',function(){
			var word = $(this).text();
			$('#keywords').val(word);
			$('#word').hide();
			//$('#search').trigger('click');触发搜索事件
		})

	})